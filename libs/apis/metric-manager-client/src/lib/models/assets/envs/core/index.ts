import { MetricManagerCloud } from './metric-manager-cloud';
import {
	ExecutionConfig,
	SensorConfig
	} from '@gdgtoulouse/structures/metric-manager';

export * from './metric-manager-cloud';

export interface Core {
	deploymentUuid: string;
	deploymentDate: number;
	metricManagerCloud: MetricManagerCloud;
	productionConfigList: SensorConfig[];
	consumptionConfig: ExecutionConfig;
	consumptionListMaxLength: number;
	maxTimeAllowedForGoingFromConsumedToReceived: number;
	maxTimeAllowedForGoingFromReceivedToSaved: number;
	sizeOfProductionsMax: number;
	productionsKeyListMaxLength: number;
}
