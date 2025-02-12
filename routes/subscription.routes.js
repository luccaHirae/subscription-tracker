import { Router } from "express";

import { authorize } from '../middlewares/auth.middleware.js';

import { createSubscription, getSubscription, getSubscriptions, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', getSubscriptions);

subscriptionRouter.get('/:id', getSubscription);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
  res.send({
    title: 'UPDATE subscription by ID',
  });
});

subscriptionRouter.delete('/:id', (req, res) => {
  res.send({
    title: 'DELETE subscription by ID',
  });
});

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => {
  res.send({
    title: 'CANCEL subscription by ID',
  });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  res.send({
    title: 'GET all upcoming renewals',
  });
});

export default subscriptionRouter;