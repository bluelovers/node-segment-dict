"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_color2_1 = require("debug-color2");
const fs = require("fs-extra");
const path = require("upath2");
const line_1 = require("../lib/loader/line");
const project_config_1 = require("../project.config");
const util_1 = require("./util");
const naturalCompare = require("string-natural-compare");
let CWD = path.join(project_config_1.default.dict_root, 'segment');
let USE_CJK_MODE = 2;
let CACHE_LIST = {
    skip: [],
};
util_1.globDict(CWD, [
    'dict_synonym/*.txt',
    'names/*.txt',
    'lazy/badword.txt',
    'lazy/index.txt',
    'lazy/dict_synonym.txt',
    //'dict*.txt',
    'phrases/*.txt',
    'pangu/*.txt',
    'infrequent/**/*.txt',
])
    .tap(function (ls) {
    let a = ls.reduce(function (a, v) {
        let p = path.relative(CWD, v);
        a.push(p);
        return a;
    }, []);
    debug_color2_1.console.debug(a);
    //process.exit();
})
    .mapSeries(async function (file) {
    let _basepath = path.relative(CWD, file);
    debug_color2_1.console.debug(`[START]`, _basepath);
    debug_color2_1.console.time(_basepath);
    let list = await util_1.loadDictFile(file, function (list, cur) {
        cur.file = file;
        let [w, p, f] = cur.data;
        let cjk_id = util_1.getCjkName(w, USE_CJK_MODE);
        cur.cjk_id = cjk_id;
        cur.line_type = util_1.chkLineType(cur.line);
        if (cur.line_type == util_1.EnumLineType.COMMENT) {
            CACHE_LIST.skip.push(cur);
            return false;
        }
        return true;
    });
    list = SortList(list);
    let out_list = list.map(v => v.line);
    //console.log(list);
    let out_file = file;
    if (0) {
        out_file = path.join(project_config_1.default.temp_root, path.basename(_basepath));
    }
    let out_data = line_1.serialize(out_list) + "\n\n";
    await fs.outputFile(out_file, out_data);
    debug_color2_1.console.timeEnd(_basepath);
})
    .tap(async function () {
    if (CACHE_LIST.skip.length) {
        let list = SortList(CACHE_LIST.skip);
        let out_list = list.map(v => v.line);
        let out_file = path.join(project_config_1.default.temp_root, 'skip2.txt');
        await fs.appendFile(out_file, "\n\n" + line_1.serialize(out_list) + "\n\n");
    }
});
function SortList(ls) {
    // @ts-ignore
    return ls.sort(function (a, b) {
        if (a.line_type == util_1.EnumLineType.COMMENT_TAG
            || b.line_type == util_1.EnumLineType.COMMENT_TAG) {
            return (a.index - b.index);
        }
        let ret = naturalCompare.caseInsensitive(a.cjk_id, b.cjk_id)
            || (a.index - b.index)
            || 0;
        return ret;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5kaWN0X3N5bm9ueW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzb3J0LmRpY3Rfc3lub255bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUF1QztBQUN2QywrQkFBK0I7QUFDL0IsK0JBQStCO0FBQy9CLDZDQUErQztBQUMvQyxzREFBOEM7QUFFOUMsaUNBQTBHO0FBQzFHLHlEQUEwRDtBQUUxRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUFhLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBRXhELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQixJQUFJLFVBQVUsR0FBRztJQUNoQixJQUFJLEVBQUUsRUFBeUI7Q0FDL0IsQ0FBQztBQUVGLGVBQVEsQ0FBQyxHQUFHLEVBQUU7SUFDYixvQkFBb0I7SUFDcEIsYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsdUJBQXVCO0lBQ3ZCLGNBQWM7SUFDZCxlQUFlO0lBQ2YsYUFBYTtJQUNiLHFCQUFxQjtDQUNyQixDQUFDO0tBQ0EsR0FBRyxDQUFDLFVBQVUsRUFBWTtJQUUxQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7UUFFL0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFOUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVWLE9BQU8sQ0FBQyxDQUFDO0lBQ1YsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVAsc0JBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakIsaUJBQWlCO0FBQ2xCLENBQUMsQ0FBQztLQUNELFNBQVMsQ0FBQyxLQUFLLFdBQVcsSUFBSTtJQUU5QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcs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QUM7ZUFDeEQsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7ZUFDbkIsQ0FBQyxDQUNKO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDWixDQUFDLENBQUMsQ0FBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25zb2xlIH0gZnJvbSBcImRlYnVnLWNvbG9yMlwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzLWV4dHJhXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJ1cGF0aDJcIjtcbmltcG9ydCB7IHNlcmlhbGl6ZSB9IGZyb20gJy4uL2xpYi9sb2FkZXIvbGluZSc7XG5pbXBvcnQgUHJvamVjdENvbmZpZyBmcm9tIFwiLi4vcHJvamVjdC5jb25maWdcIjtcblxuaW1wb3J0IHsgY2hrTGluZVR5cGUsIEVudW1MaW5lVHlwZSwgZ2V0Q2prTmFtZSwgZ2xvYkRpY3QsIElMb2FkRGljdEZpbGVSb3cyLCBsb2FkRGljdEZpbGUgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IG5hdHVyYWxDb21wYXJlID0gcmVxdWlyZSgnc3RyaW5nLW5hdHVyYWwtY29tcGFyZScpO1xuXG5sZXQgQ1dEID0gcGF0aC5qb2luKFByb2plY3RDb25maWcuZGljdF9yb290LCAnc2VnbWVudCcpO1xuXG5sZXQgVVNFX0NKS19NT0RFID0gMjtcblxubGV0IENBQ0hFX0xJU1QgPSB7XG5cdHNraXA6IFtdIGFzIElMb2FkRGljdEZpbGVSb3cyW10sXG59O1xuXG5nbG9iRGljdChDV0QsIFtcblx0J2RpY3Rfc3lub255bS8qLnR4dCcsXG5cdCduYW1lcy8qLnR4dCcsXG5cdCdsYXp5L2JhZHdvcmQudHh0Jyxcblx0J2xhenkvaW5kZXgudHh0Jyxcblx0J2xhenkvZGljdF9zeW5vbnltLnR4dCcsXG5cdC8vJ2RpY3QqLnR4dCcsXG5cdCdwaHJhc2VzLyoudHh0Jyxcblx0J3Bhbmd1LyoudHh0Jyxcblx0J2luZnJlcXVlbnQvKiovKi50eHQnLFxuXSlcblx0LnRhcChmdW5jdGlvbiAobHM6IHN0cmluZ1tdKVxuXHR7XG5cdFx0bGV0IGEgPSBscy5yZWR1Y2UoZnVuY3Rpb24gKGEsIHYpXG5cdFx0e1xuXHRcdFx0bGV0IHAgPSBwYXRoLnJlbGF0aXZlKENXRCwgdik7XG5cblx0XHRcdGEucHVzaChwKTtcblxuXHRcdFx0cmV0dXJuIGE7XG5cdFx0fSwgW10pO1xuXG5cdFx0Y29uc29sZS5kZWJ1ZyhhKTtcblxuXHRcdC8vcHJvY2Vzcy5leGl0KCk7XG5cdH0pXG5cdC5tYXBTZXJpZXMoYXN5bmMgZnVuY3Rpb24gKGZpbGUpXG5cdHtcblx0XHRsZXQgX2Jhc2VwYXRoID0gcGF0aC5yZWxhdGl2ZShDV0QsIGZpbGUpO1xuXG5cdFx0Y29uc29sZS5kZWJ1ZyhgW1NUQVJUXWAsIF9iYXNlcGF0aCk7XG5cblx0XHRjb25zb2xlLnRpbWUoX2Jhc2VwYXRoKTtcblxuXHRcdGxldCBsaXN0ID0gYXdhaXQgbG9hZERpY3RGaWxlPElMb2FkRGljdEZpbGVSb3cyPihmaWxlLCBmdW5jdGlvbiAobGlzdCwgY3VyKVxuXHRcdHtcblx0XHRcdGN1ci5maWxlID0gZmlsZTtcblxuXHRcdFx0bGV0IFt3LCBwLCBmXSA9IGN1ci5kYXRhO1xuXG5cdFx0XHRsZXQgY2prX2lkID0gZ2V0Q2prTmFtZSh3LCBVU0VfQ0pLX01PREUpO1xuXG5cdFx0XHRjdXIuY2prX2lkID0gY2prX2lkO1xuXHRcdFx0Y3VyLmxpbmVfdHlwZSA9IGNoa0xpbmVUeXBlKGN1ci5saW5lKTtcblxuXHRcdFx0aWYgKGN1ci5saW5lX3R5cGUgPT0gRW51bUxpbmVUeXBlLkNPTU1FTlQpXG5cdFx0XHR7XG5cdFx0XHRcdENBQ0hFX0xJU1Quc2tpcC5wdXNoKGN1cik7XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9KTtcblxuXHRcdGxpc3QgPSBTb3J0TGlzdCggbGlzdCk7XG5cblx0XHRsZXQgb3V0X2xpc3QgPSBsaXN0Lm1hcCh2ID0+IHYubGluZSk7XG5cblx0XHQvL2NvbnNvbGUubG9nKGxpc3QpO1xuXG5cdFx0bGV0IG91dF9maWxlID0gZmlsZTtcblxuXHRcdGlmICgwKVxuXHRcdHtcblx0XHRcdG91dF9maWxlID0gcGF0aC5qb2luKFByb2plY3RDb25maWcudGVtcF9yb290LCBwYXRoLmJhc2VuYW1lKF9iYXNlcGF0aCkpO1xuXHRcdH1cblxuXHRcdGxldCBvdXRfZGF0YSA9IHNlcmlhbGl6ZShvdXRfbGlzdCkgKyBcIlxcblxcblwiO1xuXG5cdFx0YXdhaXQgZnMub3V0cHV0RmlsZShvdXRfZmlsZSwgb3V0X2RhdGEpO1xuXG5cdFx0Y29uc29sZS50aW1lRW5kKF9iYXNlcGF0aCk7XG5cdH0pXG5cdC50YXAoYXN5bmMgZnVuY3Rpb24gKClcblx0e1xuXHRcdGlmIChDQUNIRV9MSVNULnNraXAubGVuZ3RoKVxuXHRcdHtcblx0XHRcdGxldCBsaXN0ID0gU29ydExpc3QoIENBQ0hFX0xJU1Quc2tpcCk7XG5cdFx0XHRsZXQgb3V0X2xpc3QgPSBsaXN0Lm1hcCh2ID0+IHYubGluZSk7XG5cblx0XHRcdGxldCBvdXRfZmlsZSA9IHBhdGguam9pbihQcm9qZWN0Q29uZmlnLnRlbXBfcm9vdCwgJ3NraXAyLnR4dCcpO1xuXG5cdFx0XHRhd2FpdCBmcy5hcHBlbmRGaWxlKG91dF9maWxlLCBcIlxcblxcblwiICsgc2VyaWFsaXplKG91dF9saXN0KSArIFwiXFxuXFxuXCIpO1xuXHRcdH1cblx0fSlcbjtcblxuZnVuY3Rpb24gU29ydExpc3Q8VCA9IElMb2FkRGljdEZpbGVSb3cyPihsczogVFtdKVxue1xuXHQvLyBAdHMtaWdub3JlXG5cdHJldHVybiBscy5zb3J0KGZ1bmN0aW9uIChhOiBJTG9hZERpY3RGaWxlUm93MiwgYjogSUxvYWREaWN0RmlsZVJvdzIpXG5cdHtcblx0XHRpZiAoXG5cdFx0XHRhLmxpbmVfdHlwZSA9PSBFbnVtTGluZVR5cGUuQ09NTUVOVF9UQUdcblx0XHRcdHx8IGIubGluZV90eXBlID09IEVudW1MaW5lVHlwZS5DT01NRU5UX1RBR1xuXHRcdClcblx0XHR7XG5cdFx0XHRyZXR1cm4gKGEuaW5kZXggLSBiLmluZGV4KTtcblx0XHR9XG5cblx0XHRsZXQgcmV0ID0gbmF0dXJhbENvbXBhcmUuY2FzZUluc2Vuc2l0aXZlKGEuY2prX2lkLCBiLmNqa19pZClcblx0XHRcdHx8IChhLmluZGV4IC0gYi5pbmRleClcblx0XHRcdHx8IDBcblx0XHQ7XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9KVxufVxuIl19