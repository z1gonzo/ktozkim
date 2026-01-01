import express from 'express';
import { ReportModel } from '../models/Report';
import { body, param, query, validationResult } from 'express-validator';

const router = express.Router();

// Get all reports (with optional filtering)
router.get('/', [
  query('status').optional().isString(),
  query('allegationType').optional().isString(),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('offset').optional().isInt({ min: 0 }),
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters',
        errors: errors.array()
      });
    }

    const { status, allegationType, limit = 20, offset = 0 } = req.query;

    const filters = {
      status: status as string,
      allegationType: allegationType as string,
      limit: parseInt(limit as string),
      offset: parseInt(offset as string),
    };

    const result = await ReportModel.findAll(filters);

    res.json({
      success: true,
      data: {
        reports: result.reports.map(report => ({
          id: report.id,
          userId: report.user_id,
          officialId: report.official_id,
          connectionId: report.connection_id,
          allegationType: report.allegation_type,
          title: report.title,
          description: report.description,
          evidence: report.evidence,
          status: report.status,
          reviewedBy: report.reviewed_by,
          reviewedAt: report.reviewed_at,
          createdAt: report.created_at,
          updatedAt: report.updated_at,
        })),
        total: result.total,
        limit: filters.limit,
        offset: filters.offset,
      }
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get report by ID
router.get('/:id', [
  param('id').isInt({ min: 1 }),
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID parameter',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const report = await ReportModel.findById(parseInt(id));

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.json({
      success: true,
      data: {
        report: {
          id: report.id,
          userId: report.user_id,
          officialId: report.official_id,
          connectionId: report.connection_id,
          allegationType: report.allegation_type,
          title: report.title,
          description: report.description,
          evidence: report.evidence,
          status: report.status,
          reviewedBy: report.reviewed_by,
          reviewedAt: report.reviewed_at,
          createdAt: report.created_at,
          updatedAt: report.updated_at,
        }
      }
    });
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new report (requires authentication)
router.post('/', [
  body('officialId').optional().isInt({ min: 1 }),
  body('connectionId').optional().isInt({ min: 1 }),
  body('allegationType').isString().notEmpty(),
  body('title').isString().notEmpty(),
  body('description').isString().notEmpty(),
  body('evidence').optional().isString(),
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body',
        errors: errors.array()
      });
    }

    const {
      officialId,
      connectionId,
      allegationType,
      title,
      description,
      evidence
    } = req.body;

    // Basic validation - at least one of officialId or connectionId must be provided
    if (!officialId && !connectionId) {
      return res.status(400).json({
        success: false,
        message: 'Either officialId or connectionId must be provided'
      });
    }

    // TODO: Get userId from authenticated user
    const userId = 1; // Mock user ID for now

    const newReport = await ReportModel.create({
      user_id: userId,
      official_id: officialId ? parseInt(officialId) : undefined,
      connection_id: connectionId ? parseInt(connectionId) : undefined,
      allegation_type: allegationType,
      title,
      description,
      evidence,
    });

    res.status(201).json({
      success: true,
      message: 'Report submitted successfully',
      data: {
        report: {
          id: newReport.id,
          userId: newReport.user_id,
          officialId: newReport.official_id,
          connectionId: newReport.connection_id,
          allegationType: newReport.allegation_type,
          title: newReport.title,
          description: newReport.description,
          evidence: newReport.evidence,
          status: newReport.status,
          reviewedBy: newReport.reviewed_by,
          reviewedAt: newReport.reviewed_at,
          createdAt: newReport.created_at,
          updatedAt: newReport.updated_at,
        }
      }
    });
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update report status (admin only - requires auth middleware)
router.put('/:id/status', (req: express.Request, res: express.Response) => {
  // TODO: Add authentication middleware
  res.status(501).json({
    success: false,
    message: 'Endpoint not implemented - requires authentication'
  });
});

export default router;
