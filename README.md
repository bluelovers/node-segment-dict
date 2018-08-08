# segment-dict

## dict

* [dict](https://github.com/bluelovers/node-segment-dict/tree/master/dict)

### Breaking Changes

請注意 從 2.0.0 版之後 開始 更改了 synonym 字典的格式

* 原版為一對一 => 錯字,正字
* 這裡為一對多 並且順序與原版相反 => 正字,錯字,...以,分隔更多字

## demo

```ts
import { requireLoader, requireLoaderModule, getDictPath } from 'segment-dict';

requireLoader('jieba')('../dict/nodejieba/user.dict.utf8')
	.then(function (dict)
	{
		console.log(dict);
	})
;

requireLoaderModule('segment').load(getDictPath('segment', 'dict.txt'))
	.then(function (dict)
	{
		console.log(dict);
	})
;
```

## links

* [novel-segment](https://github.com/bluelovers/node-segment)

* [線上測試 by RunKit](https://npm.runkit.com/novel-segment)

---

* [中文詞彙的意義與詞意](http://cwn.ling.sinica.edu.tw/query1.htm)
* http://cdict.info/
* http://www.kwuntung.net/synonym/
* [萌典](https://www.moedict.tw)
* [教育部重編國語辭典修訂本](http://dict.revised.moe.edu.tw/cgi-bin/cbdic/gsweb.cgi?ccd=bKKilu&o=e0&sec=sec1&index=1)

---

* http://opencc.byvoid.com/

---

* [search:jieba](https://www.npmjs.com/search?q=jieba)
* [search:nlp chinese](https://www.npmjs.com/search?q=nlp%20chinese)
* [keywords:中文分词](https://www.npmjs.com/search?q=keywords:%E4%B8%AD%E6%96%87%E5%88%86%E8%AF%8D)
* [keywords:分词](https://www.npmjs.com/search?q=keywords:%E5%88%86%E8%AF%8D)

### zh

* [segmentit](https://www.npmjs.com/package/segmentit)
* [node-opencc](https://github.com/compulim/node-opencc)
* [OpenCC](https://github.com/BYVoid/OpenCC)
* [hanzi](https://www.npmjs.com/package/hanzi)
* [jieba-js](https://github.com/bluelovers/jieba-js)
* [nodescws](https://github.com/dotSlashLu/nodescws)
* [node-analyzer](https://www.npmjs.com/package/node-analyzer)
* [nanalyzer](https://www.npmjs.com/package/nanalyzer)
* [THULAC：一个高效的中文词法分析工具包](http://thulac.thunlp.org/)
* [HanLP](https://github.com/hankcs/HanLP)
* [node-hanlp](https://github.com/beyai/node-hanlp)


#### java

* [ansj_seg](https://github.com/NLPchina/ansj_seg)

### jp

* [rakutenma](https://www.npmjs.com/package/rakutenma)
* [tiny-segmenter](https://github.com/leungwensen/tiny-segmenter)

## trie

* [aho-corasick](https://github.com/xudejian/aho-corasick)
* [aho-corasick-node](https://github.com/guofei/aho-corasick-node)

## other

* [moji](https://github.com/niwaringo/moji) 半角全角変換ライブラリ

## post

* [Aho Corasick自动机结合DoubleArrayTrie极速多模式匹配](http://www.hankcs.com/program/algorithm/aho-corasick-double-array-trie.html)
* [DoubleArrayTrie和AhoCorasickDoubleArrayTrie的实用性对比](http://www.hankcs.com/program/algorithm/double-array-trie-vs-aho-corasick-double-array-trie.html)
* [层叠隐马模型下的音译人名和日本人名识别](http://www.hankcs.com/nlp/name-transliteration-cascaded-hidden-markov-model-and-japanese-personal-names-recognition.html)
* [简单有效的多标准中文分词](http://www.hankcs.com/nlp/segment/multi-criteria-cws.html)
* [词性标注](http://www.hankcs.com/nlp/part-of-speech-tagging.html)
* [形容詞和副詞的用法說明](http://210.240.55.2/~t311/moe/engb5/diagnose/adj_adv/adjandadv_e.htm)
* [形容詞 - 實用基礎文法](http://www.taiwantestcentral.com/Grammar/Title.aspx?ID=4)
* [什麼是複合形容詞？教你有力又到位的形容人事物！](https://tw.blog.voicetube.com/archives/11889 "Permalink to 【實用】什麼是複合形容詞？教你有力又到位的形容人事物！")
* [HanLP在线演示](http://hanlp.hankcs.com/)
* [全国名字ランキング](https://myoji-yurai.net/prefectureRanking.htm)
* [跳跃表，字典树（单词查找树，Trie树），后缀树，KMP算法，AC 自动机相关算法原理详细汇总](https://blog.csdn.net/zhongwen7710/article/details/39274349)

