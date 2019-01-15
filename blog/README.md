



# 管中窥豹 EOS 数据存储之 database::find

<p align="right">作者：jatel</p>

<p align="right">联系邮箱：jatel@blockabc.com</p>

<p align="right">日期：2019.1.15</p>





服务端缓存数据的存储方式，既要支撑起上层业务的快速增删改查，又要保持数据一致性实现持久化存储，是决定性能吞吐量的核心因素之一。

eos 的 database 利用 multi_index_container 容器实现了数据的快速增删改查。本文通过详细分析 database::find 模版函数的实现窥探eos的内存模型，eos 的版本是 mainnet-1.5.1 ，文件路径在 eos/libraries/chainbase/include/chainbase/chainbase.hpp。

本文以 get_abi 函数为入口开始分析，
```
// eos/plugins/chain_plugin/chain_plugin.cpp 1126 行
abi_def get_abi( const controller& db, const name& account ) {
   const auto &d = db.db();
   const account_object *code_accnt = d.find<account_object, by_name>(account);
   EOS_ASSERT(code_accnt != nullptr, chain::account_query_exception, "Fail to retrieve account for ${account}", ("account", account) );
   abi_def abi;
   abi_serializer::to_abi(code_accnt->abi, abi);
   return abi;
}
```
利用 database 的 find 模版函数，模版函数的类型实参分别为 account_object 类型和 by_name 类型（此处 database::find 模版函数的类型参数为3个，最后一个可以通过函数的实际参数类型推导出来即 eosio::chain::name ，所以不需要显式声明），实现通过账户名称快速查找到账户信息。此处我们的第一感觉 database::find 的实现应该是利用关联性容器的 find，比如 std::map 的 find，std::map 内部是红黑树实现的平衡二叉树，理论上它的查找操作复杂度为对数级别。
# database::find 函数分析
接下来我们逐行分析 database::find 的代码
```
// eos/libraries/chainbase/include/chainbase/chainbase.hpp 887 行
template< typename ObjectType, typename IndexedByType, typename CompatibleKey >
const ObjectType* find( CompatibleKey&& key )const
{
    CHAINBASE_REQUIRE_READ_LOCK("find", ObjectType);
    typedef typename get_index_type< ObjectType >::type index_type;
    const auto& idx = get_index< index_type >().indices().template get< IndexedByType >();
    auto itr = idx.find( std::forward< CompatibleKey >( key ) );
    if( itr == idx.end() ) return nullptr;
    return &*itr;
}
```
### get_index_type 模版类分析
get_index_type 模版类的内部自定义类型 type 为各个 ObjectType 关联的多索引容器类型，此处 account_object 关联的多索引容器类型为 account_index 。get_index_type 模版类的通用模版定义为：
```
// eos/libraries/chainbase/include/chainbase/chainbase.hpp 118 行
template<typename T>
struct get_index_type {};
```
各个需要存储的 ObjectType 通过宏 CHAINBASE_SET_INDEX_TYPE 特化此模版类，从而实现了通过 ObjectType 类型找到关联的多索引容器类型。
```
#define CHAINBASE_SET_INDEX_TYPE( OBJECT_TYPE, INDEX_TYPE )  \
namespace chainbase { template<> struct get_index_type<OBJECT_TYPE> { typedef INDEX_TYPE type; }; }
```
### account_index 多索引容器分析
理解了此特化过程，可以通过宏，快速找到 ObjectType 关联的 index_type 。搜索代码可得：account_object 关联的类型为 account_index ：
```
// eos/libraries/chain/include/eosio/chain/account_object.hpp 80 行
CHAINBASE_SET_INDEX_TYPE(eosio::chain::account_object, eosio::chain::account_index)
```
具体的 account_object 类型和 account_index 类型如下：
```
// eos/libraries/chain/include/eosio/chain/account_object.hpp 15 行
class account_object : public chainbase::object<account_object_type, account_object> {
    OBJECT_CTOR(account_object,(code)(abi))

    id_type              id;
    account_name         name;
    uint8_t              vm_type      = 0;
    uint8_t              vm_version   = 0;
    bool                 privileged   = false;

    time_point           last_code_update;
    digest_type          code_version;
    block_timestamp_type creation_date;

    shared_blob    code;
    shared_blob    abi;

    void set_abi( const eosio::chain::abi_def& a ) {
         abi.resize( fc::raw::pack_size( a ) );
         fc::datastream<char*> ds( abi.data(), abi.size() );
         fc::raw::pack( ds, a );
    }

    eosio::chain::abi_def get_abi()const {
         eosio::chain::abi_def a;
         EOS_ASSERT( abi.size() != 0, abi_not_found_exception, "No ABI set on account ${n}", ("n",name) );

         fc::datastream<const char*> ds( abi.data(), abi.size() );
         fc::raw::unpack( ds, a );
         return a;
      }
   };
   using account_id_type = account_object::id_type;

   struct by_name;
   using account_index = chainbase::shared_multi_index_container<
      account_object,
      indexed_by<
         ordered_unique<tag<by_id>, member<account_object, account_object::id_type, &account_object::id>>,
         ordered_unique<tag<by_name>, member<account_object, account_name, &account_object::name>>
      >
   >;
```
查看 account_index 类型，我们发现此容器建立了两个 ordered_unique 索引，索引的 tag 分别为 by_id 和 by_name 。ordered_unique 索引大家可以理解为 std::map ，key 不能重复，按照中序遍历为从小到大排序，顺序依赖小于语义的函数实现。
### database::get_index 模版函数分析

回到 database 的 find 函数，怎么通过 index_type 类型找到具体的 index_type 类型对象实例，此过程调用模版函数 get_index ，模版函数实参类型为 account_index 类型：
```
// eos/libraries/chainbase/include/chainbase/chainbase.hpp 854 行
template<typename MultiIndexType>
const generic_index<MultiIndexType>& get_index()const
{
    CHAINBASE_REQUIRE_READ_LOCK("get_index", typename MultiIndexType::value_type);
    typedef generic_index<MultiIndexType> index_type;
    typedef index_type*                   index_type_ptr;
    assert( _index_map.size() > index_type::value_type::type_id );
    assert( _index_map[index_type::value_type::type_id] );
    return *index_type_ptr( _index_map[index_type::value_type::type_id]->get() );
}
```
### generic_index 模版类分析
关于 generic_index 模版类型及其 undo 和 commit 此处暂时不展开。eos 通过 database 的 add_index 模版函数添加要存储的 generic_index<index_type> 对象实例，所有的 generic_index<index_type> 实例对象的地址会存储在 database 的成员变量  _index_map 中，以 index_type::value_type::type_id 做为 vector 的下标索引找到 generic_index<index_type> 的对象实例。
```
// eos/libraries/chainbase/include/chainbase/chainbase.hpp 256 行
const index_type& indices()const { return _indices; }
```
通过 generic_index 的 indices 函数我们找到了 index_type 的实例，既 multi_index_container 容器类型的对象实例,然后可以根据索引的 tag 获取获取类似于 std::map 的对象，实现快速查找。
```
index_type      _indices;
```
回到 database 的 find 函数，利用 multi_index_container的 get< IndexedByType >() 函数，我们通过 by_name 这个 tag 找到类 std::map 对象，用对数复杂度的 find 函数找到 account_object 对象。实现了通过名称查找账户信息。
# 总结
通过以上分析，我们可以总结下 find 函数的工作流程：
1. get_index_type 模版类的特化实现了通过 ObjectType 获取相对应的 index_type。
2. 以 index_type::value_type::type_id 做为 _index_map 这个 vector 的下标索引找到 generic_index<index_type> 的对象实例，进而获取 index_type 类型对象实例。
3. 在 index_type 类型对象实例中通过 IndexedByType 类型 tag 获取关联性容器对象实例，进而进行数据操作。

database 的 _index_map 成员变量利用 vector 存储了 generic_index<index_type> 对象的指针（可以通过 database::add_index 函数查看存储了那些 generic_index 对象，可以通过宏 CHAINBASE_SET_INDEX_TYPE 查找 ObjectType 和与之关联的 index_type 类型）。找到 multi_index_container 类型定义可以看到建立了那些 tag 索引，是不可重复的红黑树，还是可重复的红黑树，是不可重复的哈希表，还是可以重复的哈希表，是随机访问数组，还是其他，进而可以有效利用缓存里面的 eos 数据，利用 multi_index_container 的索引快速获取 account_object 对象，进行相应的对象上的操作。
# 预告
管中窥豹EOS数据存储系列致力于深入源码底层细节剖析 eos 的存储模型。
下篇管中窥豹EOS数据存储系列重点讲述 database::add_index 和 _index_map ，请关注后续更新。
# 
