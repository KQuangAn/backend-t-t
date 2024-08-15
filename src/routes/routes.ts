import { Router } from 'express';
import { getReachableUrls, getReachableUrlsByPriority } from '../controllers/urlController';
import { validatePriorityParam, validateUrls } from '../validation/validation';

const router = Router();

router.post('/urls/reachable', validateUrls, getReachableUrls);

router.get('/urls/reachable/:priority', validatePriorityParam, getReachableUrlsByPriority);

export default router;
