// test upload file to GCS

// src/upload/upload.test.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from './upload.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import * as fs from 'fs';
import * as path from 'path';

test('upload file to GCS', async () => {
    const file = {
        originalname: 'test.jpg',
        buffer: Buffer.from('test'),
    };
    
    const uploadService = new UploadService();
    uploadService.uploadFileToGCS = jest.fn().mockResolvedValue('https://storage.googleapis.com/myapp_storage_service_bucket/test.jpg');
    
    const result = await uploadService.uploadFileToGCS(file as any);
    expect(result).toEqual('https://storage.googleapis.com/myapp_storage_service_bucket/test.jpg');
});
// test save file locally
test('save file locally', async () => {
    const file = {
        originalname: 'test.jpg',
        buffer: Buffer.from('test'),
    };
    const uploadService = new UploadService();
    uploadService.saveFileLocally = jest.fn().mockResolvedValue(path.resolve(__dirname, '../../uploads/test.jpg'));

    const result = await uploadService.saveFileLocally(file as any);
    expect(result).toEqual(path.resolve(__dirname, '../../uploads/test.jpg'));
});