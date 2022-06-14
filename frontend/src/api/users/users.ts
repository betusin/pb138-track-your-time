/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * TrackYourTime
 * OpenAPI spec version: 1.0.0
 */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import type {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from ".././model";

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

/**
 * @summary Creates a new user account
 */
export const userControllerCreate = (
  createUserDto: CreateUserDto,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<void>> => {
  return axios.post(`/users`, createUserDto, options);
};

/**
 * @summary Updates the profile of the current user
 */
export const meControllerUpdate = (
  updateUserDto: UpdateUserDto,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<void>> => {
  return axios.patch(`/me`, updateUserDto, options);
};

/**
 * @summary Deletes the profile of the current user
 */
export const meControllerRemove = (
  options?: AxiosRequestConfig
): Promise<AxiosResponse<void>> => {
  return axios.delete(`/me`, options);
};

/**
 * @summary Changes the password of the current user
 */
export const meControllerPassword = (
  updateUserPasswordDto: UpdateUserPasswordDto,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<void>> => {
  return axios.put(`/me/password`, updateUserPasswordDto, options);
};
