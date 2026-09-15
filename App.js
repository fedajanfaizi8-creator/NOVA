import 'react-native-url-polyfill/auto';
import React, {useMemo, useState} from 'react';
import {SafeAreaView, View, Text, Pressable, ScrollView, TextInput, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {Ionicons} from '@expo/vector-icons';

const samplePosts = [
  {id:1, user:'NOVA Creator', text:'به دنیای NOVA خوش آمدید 🌟', likes:1240, comments:86},
  {id:2, user:'Global Star', text:'Create. Share. Connect. 🚀', likes:892, comments:41},
  {id:3, user:'NOVA Live', text:'پخش زنده و ارتباط با دنیا در یک جا.', likes:531, comments:29},
];

export default function App() {
  const [tab, setTab] = useState('home');
  const [liked, setLiked] = useState({});
  const [query, setQuery] = useState('');

  const title = useMemo(() => ({
    home:'NOVA', hot:'داغ‌ترین‌ها', create:'ایجاد', live:'LIVE', profile:'پروفایل'
  }[tab] || 'NOVA'), [tab]);

  const nav = [
    ['home','home','خانه'], ['hot','flame','داغ'], ['create','add-circle','ایجاد'],
    ['live','radio','LIVE'], ['profile','person','پروفایل']
  ];

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar style="light" />
      <View style={s.header}>
        <Text style={s.logo}>{title}</Text>
        <View style={s.headerBtns}>
          <Pressable onPress={()=>setQuery('')} style={s.iconBtn}><Ionicons name="search" size={22} color="#fff"/></Pressable>
          <Pressable style={s.iconBtn}><Ionicons name="notifications-outline" size={22} color="#fff"/></Pressable>
        </View>
      </View>

      {tab === 'home' && <ScrollView contentContainerStyle={s.feed}>
        <View style={s.searchBox}>
          <Ionicons name="search" size={18} color="#aaa"/>
          <TextInput value={query} onChangeText={setQuery} placeholder="جستجو در NOVA..." placeholderTextColor="#888" style={s.searchInput}/>
        </View>
        {samplePosts.filter(p=>!query || p.text.toLowerCase().includes(query.toLowerCase())).map(p=>(
          <View key={p.id} style={s.card}>
            <View style={s.userRow}>
              <View style={s.avatar}><Text style={s.avatarText}>{p.user[0]}</Text></View>
              <View><Text style={s.user}>{p.user}</Text><Text style={s.muted}>همین حالا</Text></View>
            </View>
            <View style={s.videoBox}><Ionicons name="play-circle" size={60} color="#fff"/><Text style={s.videoLabel}>NOVA VIDEO</Text></View>
            <Text style={s.postText}>{p.text}</Text>
            <View style={s.actions}>
              <Pressable onPress={()=>setLiked({...liked,[p.id]:!liked[p.id]})} style={s.action}>
                <Ionicons name={liked[p.id]?'heart':'heart-outline'} size={25} color={liked[p.id]?'#ff3b68':'#fff'}/>
                <Text style={s.actionText}>{p.likes+(liked[p.id]?1:0)}</Text>
              </Pressable>
              <Pressable style={s.action}><Ionicons name="chatbubble-outline" size={23} color="#fff"/><Text style={s.actionText}>{p.comments}</Text></Pressable>
              <Pressable style={s.action}><Ionicons name="share-social-outline" size={23} color="#fff"/><Text style={s.actionText}>اشتراک</Text></Pressable>
            </View>
          </View>
        ))}
      </ScrollView>}

      {tab === 'hot' && <ScrollView contentContainerStyle={s.page}><Text style={s.h1}>🔥 داغ‌ترین محتوا</Text><Text style={s.body}>موضوعات محبوب، ویدیوهای پرطرفدار و سازندگان برتر در این بخش قرار می‌گیرند.</Text></ScrollView>}
      {tab === 'create' && <ScrollView contentContainerStyle={s.page}>
        <Text style={s.h1}>ایجاد محتوا</Text>
        {[
          ['videocam','ویدیوی جدید'],['image','عکس و AI Photo Editor'],['musical-notes','Video Editor + Effects'],['happy','استیکرهای متحرک'],['text','پست متنی']
        ].map(([ic,t])=><Pressable key={t} style={s.bigBtn}><Ionicons name={ic} size={26} color="#fff"/><Text style={s.bigBtnText}>{t}</Text></Pressable>)}
      </ScrollView>}
      {tab === 'live' && <ScrollView contentContainerStyle={s.page}>
        <Text style={s.h1}>🔴 NOVA LIVE</Text><Text style={s.body}>این صفحه برای پخش زنده واقعی آماده شده است؛ اتصال به سرویس استریم و کلیدهای آن باید در مرحله انتشار فعال شود.</Text>
        <Pressable style={s.liveBtn}><Ionicons name="radio" size={24} color="#fff"/><Text style={s.bigBtnText}>شروع LIVE</Text></Pressable>
        <Text style={s.muted}>امکانات هدف: دوربین، میکروفون، مهمان، کامنت، هدیه، تعداد بیننده و درآمد.</Text>
      </ScrollView>}
      {tab === 'profile' && <ScrollView contentContainerStyle={s.page}>
        <View style={s.profileTop}><View style={s.profileAvatar}><Ionicons name="person" size={44} color="#fff"/></View><Text style={s.h1}>پروفایل NOVA</Text></View>
        {['دنبال‌شوندگان','پیام‌ها','اعلان‌ها','کیف پول و درآمد','تنظیمات و زبان'].map(x=><Pressable key={x} style={s.row}><Text style={s.body}>{x}</Text><Ionicons name="chevron-forward" size={20} color="#aaa"/></Pressable>)}
      </ScrollView>}

      <View style={s.nav}>{nav.map(([id,ic,lab])=><Pressable key={id} onPress={()=>setTab(id)} style={s.navItem}>
        <Ionicons name={ic} size={25} color={tab===id?'#b7ff31':'#aaa'}/><Text style={[s.navText,tab===id&&s.active]}>{lab}</Text>
      </Pressable>)}</View>
    </SafeAreaView>
  );
}

const s=StyleSheet.create({
  safe:{flex:1,backgroundColor:'#080808'}, header:{height:62,paddingHorizontal:16,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#191919'},
  logo:{fontSize:28,fontWeight:'900',color:'#fff'}, headerBtns:{flexDirection:'row',gap:12},iconBtn:{padding:8},
  feed:{padding:12,paddingBottom:100}, searchBox:{height:44,borderRadius:22,backgroundColor:'#171717',flexDirection:'row',alignItems:'center',paddingHorizontal:14,marginBottom:12},
  searchInput:{flex:1,color:'#fff',marginLeft:8},card:{backgroundColor:'#121212',borderRadius:18,padding:12,marginBottom:14,borderWidth:1,borderColor:'#202020'},
  userRow:{flexDirection:'row',alignItems:'center',gap:10},avatar:{width:42,height:42,borderRadius:21,backgroundColor:'#b7ff31',alignItems:'center',justifyContent:'center'},avatarText:{fontSize:20,fontWeight:'900',color:'#111'},
  user:{color:'#fff',fontWeight:'800'},muted:{color:'#777',fontSize:12,marginTop:3},videoBox:{height:360,borderRadius:15,backgroundColor:'#252525',marginTop:12,alignItems:'center',justifyContent:'center'},videoLabel:{color:'#777',marginTop:8,fontWeight:'700'},
  postText:{color:'#fff',fontSize:16,lineHeight:24,marginTop:10},actions:{flexDirection:'row',alignItems:'center',gap:24,marginTop:12},action:{flexDirection:'row',alignItems:'center',gap:6},actionText:{color:'#ddd'},
  page:{padding:20,paddingBottom:110},h1:{color:'#fff',fontSize:25,fontWeight:'900',marginBottom:14},body:{color:'#ddd',fontSize:16,lineHeight:25,marginBottom:16},
  bigBtn:{height:62,borderRadius:16,backgroundColor:'#171717',borderWidth:1,borderColor:'#292929',marginBottom:12,paddingHorizontal:18,flexDirection:'row',alignItems:'center',gap:15},bigBtnText:{color:'#fff',fontSize:16,fontWeight:'800'},liveBtn:{height:62,borderRadius:16,backgroundColor:'#d62d50',alignItems:'center',justifyContent:'center',flexDirection:'row',gap:10,marginVertical:15},
  profileTop:{alignItems:'center',marginBottom:25},profileAvatar:{width:100,height:100,borderRadius:50,backgroundColor:'#252525',alignItems:'center',justifyContent:'center',marginBottom:12},row:{height:58,borderBottomWidth:1,borderBottomColor:'#202020',flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  nav:{position:'absolute',bottom:0,left:0,right:0,height:72,backgroundColor:'#101010',borderTopWidth:1,borderTopColor:'#222',flexDirection:'row',justifyContent:'space-around',alignItems:'center'},navItem:{alignItems:'center',minWidth:60},navText:{color:'#aaa',fontSize:11,marginTop:2},active:{color:'#b7ff31',fontWeight:'800'}
});
