import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import * as path from 'path';
// test upload file to GCS
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
// test controller
test('upload to GCS', async () => {
    const file = {
        originalname: 'test.jpg',
        buffer: Buffer.from('test'),
    };
    const uploadService = new UploadService();
    uploadService.uploadFileToGCS = jest.fn().mockResolvedValue('https://storage.googleapis.com/myapp_storage_service_bucket/test.jpg');
    
    const uploadController = new UploadController(uploadService);
    const result = await uploadController.uploadToGCS(file as any);
    expect(result).toEqual('https://storage.googleapis.com/myapp_storage_service_bucket/test.jpg');
});
// test controller
test('upload locally', async () => {
    const file = {
        originalname: 'test.jpg',
        buffer: Buffer.from('test'),
    };
    const uploadService = new UploadService();
    uploadService.saveFileLocally = jest.fn().mockResolvedValue(path.resolve(__dirname, '../../uploads/test.jpg'));

    const uploadController = new UploadController(uploadService);
    const result = await uploadController.uploadToLocal(file as any);
    expect(result).toEqual(path.resolve(__dirname, '../../uploads/test.jpg'));
});
