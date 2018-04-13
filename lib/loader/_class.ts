/**
 * Created by user on 2018/4/13/013.
 */

import * as Promise from 'bluebird';
import { wrapStreamToPromise, IStreamLineWithValue } from '../fs/line';
import createLoadStream, { ICallback } from '../fs/stream';
import createLoadStreamSync from '../fs/sync';
import { autobind } from 'core-decorators';

export type IOptions<T, R> = {

	parseLine?(input: string, oldFn?: (input: string) => R): R,

	mapper?(line),

	filter?(line),

};

@autobind
export class LoaderClass<T, R>
{
	public default = this.load;
	defaultOptions: IOptions<T, R>;

	constructor(options: IOptions<T, R> = {}, ...argv)
	{
		if (options.parseLine)
		{
			this.parseLine = options.parseLine.bind(this);
		}
	}

	static create(options: IOptions<any, any> = {}, ...argv)
	{
		return new this(options, ...argv);
	}

	parseLine(input: string): R
	{
		return input as any as R
	}

	load(file: string, options: IOptions<T, R> = {}): Promise<T>
	{
		return wrapStreamToPromise(this.loadStream(file, options))
			.then(function (stream: IStreamLineWithValue<T>)
			{
				return stream.value;
			})
			;
	}

	loadSync(file: string, options: IOptions<T, R> = {})
	{
		return this.loadStreamSync(file, options).value;
	}

	loadStream(file: string, options: IOptions<T, R> = {}, callback?: ICallback<T>)
	{
		return this._createStream(createLoadStream, file, options, callback)
	}

	loadStreamSync(file: string, options: IOptions<T, R> = {}, callback?: ICallback<T>)
	{
		return this._createStream(createLoadStreamSync, file, options, callback)
	}

	protected _createStream<T>(fnStream: typeof createLoadStream,
		file: string,
		options: IOptions<T, R> = {},
		callback?: ICallback<T>
	)
	{
		let self = this;

		let opts = Object.assign({}, this.defaultOptions, options);

		let parseLine = opts.parseLine || self.parseLine;
		let filter = opts.filter;

		opts.parseLine = parseLine;

		let stream = fnStream<T>(file, {

			callback,

			mapper: opts.mapper || function mapper(line)
			{
				if (filter)
				{
					line = filter(line);
				}

				if (line)
				{
					return parseLine(line, self.parseLine);
				}
			},

		});

		// @ts-ignore
		stream.pipeLoader = self;
		// @ts-ignore
		stream.pipeRuntimeOptions = opts;

		return stream;
	}
}

export default LoaderClass;
