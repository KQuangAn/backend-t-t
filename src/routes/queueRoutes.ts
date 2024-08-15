import { checkUrlsProcessor } from "../jobs/jobs";
import { jobQueue } from "../config/bull/queue";

jobQueue.process('checkUrls', checkUrlsProcessor);
