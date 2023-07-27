import { Router, Request, Response } from 'express';
import controller from '../controllers';
const router = Router();

export default router;

router.get('/', (req: Request, res: Response): void => {
    res.json({ status: 'ok' });
});

router.get('/api/exchange', controller);
