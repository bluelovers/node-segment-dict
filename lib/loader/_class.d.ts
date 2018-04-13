/// <reference types="bluebird" />
/**
 * Created by user on 2018/4/13/013.
 */
import * as Promise from 'bluebird';
import { IStreamLineWithValue } from '../fs/line';
import createLoadStream, { ICallback } from '../fs/stream';
export declare type IOptions<T, R> = {
    parseLine?(input: string, oldFn?: (input: string) => R): R;
    mapper?(line);
    filter?(line);
    stringifyLine?(data: R): string;
};
export declare class LoaderClass<T, R> {
    default: (file: string, options?: IOptions<T, R>) => Promise<T>;
    defaultOptions: IOptions<T, R>;
    constructor(options?: IOptions<T, R>, ...argv: any[]);
    static create(options?: IOptions<any, any>, ...argv: any[]): LoaderClass<any, any>;
    parseLine(input: string): R;
    stringifyLine(data: R): string;
    serialize(data: R[]): string;
    filter(input: string): string;
    load(file: string, options?: IOptions<T, R>): Promise<T>;
    loadSync(file: string, options?: IOptions<T, R>): T;
    loadStream(file: string, options?: IOptions<T, R>, callback?: ICallback<T>): IStreamLineWithValue<T>;
    loadStreamSync(file: string, options?: IOptions<T, R>, callback?: ICallback<T>): IStreamLineWithValue<T>;
    protected _createStream<T>(fnStream: typeof createLoadStream, file: string, options?: IOptions<T, R>, callback?: ICallback<T>): IStreamLineWithValue<T>;
}
export default LoaderClass;