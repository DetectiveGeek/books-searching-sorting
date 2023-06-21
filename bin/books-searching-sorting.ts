#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { BooksSearchingSortingStack } from '../lib/books-searching-sorting-stack';

const app = new cdk.App();
new BooksSearchingSortingStack(app, 'BooksSearchingSortingStack');
