import { Router } from "express";
import { ResourceHealth } from "../interfaces/resources-health-enum";
import { HealthService } from "../service/health-service";

const healthRoutes = Router()

healthRoutes.get('/health', async (req, resp) => {
    const healthService = new HealthService(
        [
            ///Services would go here
        ]
    )

    const healthResults = await healthService.getHealth();

    resp.status(healthResults.status === ResourceHealth.Healthy ? 200 : 503)
    .send({
        status: healthResults.status, dependencies: healthResults.results
    });
});

export { healthRoutes } 

