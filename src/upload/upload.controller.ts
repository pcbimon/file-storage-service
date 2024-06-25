// src/upload/upload.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('gcs')
  @UseInterceptors(FileInterceptor('file'))
  async uploadToGCS(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadFileToGCS(file);
  }

  @Post('local')
  @UseInterceptors(FileInterceptor('file'))
  async uploadToLocal(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.saveFileLocally(file);
  }
}
