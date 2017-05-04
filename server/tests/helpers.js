/* eslint-disable */
import supertest from 'supertest';
import chai from 'chai';
import jwt from 'jsonwebtoken';

import app from '../../server';
import db from '../models/index';
import faker from './faker-data';
/* eslint-enable */

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.db = db;
global.faker = faker;
global.jwt = jwt;
