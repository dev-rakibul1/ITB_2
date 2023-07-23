import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ISearchInput } from './search.interface';
import { searchService } from './search.service';

const createSearch = catchAsync(async (req: Request, res: Response) => {
  const { ...newSearch } = req.body;

  const result = await searchService.createNewSearchService(newSearch);

  sendResponse<ISearchInput>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Search create successfully!',
    data: result,
  });
});

const getSearch = catchAsync(async (req: Request, res: Response) => {
  const result = await searchService.getSearchService();

  sendResponse<ISearchInput[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Search get successfully!',
    data: result,
  });
});

export const searchController = {
  createSearch,
  getSearch,
};
