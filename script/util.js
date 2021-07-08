"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.all_extra_dict = exports.all_default_load_dict = exports.baseSortList = exports.chkLineType = exports.EnumLineType = exports.loadDictFile = exports.globDict = exports.DEFAULT_IGNORE = exports.getCjkName = exports.zhDictCompare = void 0;
const tslib_1 = require("tslib");
const fast_glob_1 = (0, tslib_1.__importDefault)(require("@bluelovers/fast-glob"));
const BluebirdPromise = require("bluebird");
const loader_line_1 = (0, tslib_1.__importDefault)(require("@novel-segment/loader-line"));
const index_1 = require("@novel-segment/loaders/segment/index");
const string_natural_compare_1 = (0, tslib_1.__importDefault)(require("@bluelovers/string-natural-compare"));
const util_1 = require("@novel-segment/util");
Object.defineProperty(exports, "zhDictCompare", { enumerable: true, get: function () { return util_1.zhDictCompare; } });
Object.defineProperty(exports, "getCjkName", { enumerable: true, get: function () { return util_1.getCjkName; } });
exports.DEFAULT_IGNORE = [
    //'char*',
    '**/skip',
    '**/jieba',
    '**/lazy',
    '**/synonym',
    '**/names',
];
function globDict(cwd, pattern, ignore = exports.DEFAULT_IGNORE) {
    return BluebirdPromise
        .resolve((0, fast_glob_1.default)(pattern, {
        cwd,
        absolute: true,
        ignore,
        markDirectories: true,
    }));
}
exports.globDict = globDict;
function loadDictFile(file, fn, options) {
    options = options || {};
    const parseFn = options.parseFn = options.parseFn || index_1.parseLine;
    return (0, loader_line_1.default)(file)
        .then(function (b) {
        if (!b) {
            return [];
        }
        return b.reduce(function (a, line, index, arr) {
            let bool;
            let data = parseFn(line);
            let cur = {
                data,
                line,
                index,
            };
            if (fn) {
                // @ts-ignore
                bool = fn(a, cur);
            }
            else {
                bool = true;
            }
            if (bool) {
                a.push(cur);
            }
            return a;
        }, []);
    });
}
exports.loadDictFile = loadDictFile;
var EnumLineType;
(function (EnumLineType) {
    EnumLineType[EnumLineType["BASE"] = 0] = "BASE";
    EnumLineType[EnumLineType["COMMENT"] = 1] = "COMMENT";
    EnumLineType[EnumLineType["COMMENT_TAG"] = 2] = "COMMENT_TAG";
})(EnumLineType = exports.EnumLineType || (exports.EnumLineType = {}));
function chkLineType(line) {
    let ret = EnumLineType.BASE;
    if (line.indexOf('//') == 0) {
        ret = EnumLineType.COMMENT;
        if (/ @todo/i.test(line)) {
            ret = EnumLineType.COMMENT_TAG;
        }
    }
    return ret;
}
exports.chkLineType = chkLineType;
function baseSortList(ls, bool) {
    return ls.sort(function (a, b) {
        // @ts-ignore
        return string_natural_compare_1.default.caseInsensitive(a.cjk_id, b.cjk_id)
            // @ts-ignore
            || string_natural_compare_1.default.caseInsensitive(a.data[1], b.data[1])
            // @ts-ignore
            || string_natural_compare_1.default.caseInsensitive(a.data[0], b.data[0])
            // @ts-ignore
            || string_natural_compare_1.default.caseInsensitive(a.data[2], b.data[2]);
    });
}
exports.baseSortList = baseSortList;
function all_default_load_dict() {
    return [
        'dict_synonym/*.txt',
        'names/*.txt',
        'lazy/*.txt',
        'dict*.txt',
        'phrases/*.txt',
        'pangu/*.txt',
        'char.txt',
    ];
}
exports.all_default_load_dict = all_default_load_dict;
function all_extra_dict() {
    return [
        'infrequent/**/*.txt',
    ];
}
exports.all_extra_dict = all_extra_dict;
/*
export function getCjkName(w: string, USE_CJK_MODE: number)
{
    let cjk_id = w;

    if (1)
    {
        cjk_id = slugify(w, true);
    }
    else if (USE_CJK_MODE > 1)
    {
        let cjk_list = textList(w);
        cjk_list.sort();
        cjk_id = cjk_list[0];
    }
    else if (USE_CJK_MODE)
    {
        let cjk_list = libTable.auto(w);
        cjk_list.sort();
        cjk_id = cjk_list[0];
    }

    return StrUtil.toHalfWidth(cjk_id);
}
*/
//console.log(['第', '一', 'Ｔ', '网开一面', '三街六市'].sort(zhDictCompare));
//# sourceMappingURL=util.js.map