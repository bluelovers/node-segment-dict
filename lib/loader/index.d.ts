/// <reference types="bluebird" />
import * as Promise from 'bluebird';
import * as JIEBA from './jieba';
import * as SEGMENT from './segment';
import * as OPENCC from './opencc';
import LoaderClass from './_class';
export declare function requireDefault<T = any>(id: any, subtype: string): (file: string) => Promise<T>;
export declare function requireDefault(id: 'jieba'): typeof JIEBA.default;
export declare function requireDefault(id: 'segment'): typeof SEGMENT.default;
export declare function requireDefault(id: 'opencc'): typeof OPENCC.default;
export declare function requireDefault<T = any>(id: any, subtype?: string): (file: string) => Promise<T>;
export declare function requireModule<T = any>(id: any, subtype: string): IRequireModule<T>;
export declare function requireModule(id: 'jieba'): typeof JIEBA;
export declare function requireModule(id: 'segment'): typeof SEGMENT;
export declare function requireModule(id: 'opencc'): typeof OPENCC;
export declare function requireModule<T = any>(id: any, subtype?: string): IRequireModule<T>;
export declare type IRequireModule<T = any> = LoaderClass<T, any>;
export default requireDefault;
