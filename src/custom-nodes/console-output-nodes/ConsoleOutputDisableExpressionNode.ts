import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { IOptions } from '../../interfaces/options/IOptions';

import { ConsoleOutputDisableExpressionTemplate } from '../../templates/custom-nodes/console-output-nodes/console-output-disable-expression-node/ConsoleOutputDisableExpressionTemplate';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { RandomGeneratorUtils } from '../../utils/RandomGeneratorUtils';

@injectable()
export class ConsoleOutputDisableExpressionNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    private callsControllerFunctionName: string;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param callsControllerFunctionName
     */
    public initialize (callsControllerFunctionName: string): void {
        this.callsControllerFunctionName = callsControllerFunctionName;
    }

    /**
     * @returns {string}
     */
    protected getTemplate (): string {
        return format(ConsoleOutputDisableExpressionTemplate(), {
            consoleLogDisableFunctionName: RandomGeneratorUtils.getRandomVariableName(),
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
