import express from 'express';
import { getUserVCF, createUserVCF, downloadUserVCF } from '../controller/vcf.js';

const router = express.Router();

router.get('/download/:id', downloadUserVCF);
router.get('/:id', getUserVCF);
router.post('/', createUserVCF);

export default router;
