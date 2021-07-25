import { ResourceHealth } from "../interfaces/resources-health-enum";

export abstract class HealthIndicator {
    abstract name: string;
    status!: ResourceHealth | ResourceHealth
    details: string | undefined
    
    abstract checkHealth(): Promise<void>
}