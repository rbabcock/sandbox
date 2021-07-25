import { HealthIndicator } from "./health-indicator";
import axios, { AxiosResponse } from 'axios';
import { ResourceHealth } from "../interfaces/resources-health-enum";

export class HealthCheckTest extends HealthIndicator {
    name: string = "test"

    async checkHealth(): Promise<void> {
        let results: AxiosResponse<any>
        try {
            const pingUrl = "http://localhost:3000/ping"
            results = await axios(pingUrl)

            if(results.status === 200) {
                this.status = ResourceHealth.Healthy;
            } else {
                this.status = ResourceHealth.Unhealthy;
                this.details = `Recived status: ${results.status}`
            }
        } catch (err) {
            this.status = ResourceHealth.Unhealthy;
            this.details = err.message;
            console.log(`${this.name} is unheathly.`, err.message);
        }
    }
}