/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * TrackYourTime
 * OpenAPI spec version: 1.0.0
 */
import type { GetSessionPhotoDto } from "./getSessionPhotoDto";

export interface GetSessionWithPhotosDto {
  id: string;
  fromDate: string;
  toDate: string;
  hourlyRate?: number;
  note?: string;
  isInvoiced: boolean;
  projectId: string;
  photos: GetSessionPhotoDto[];
}