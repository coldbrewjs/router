import { Router } from '../router';
import {
    AxiosError,
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
    Method,
} from 'axios';

export type RouterInstance = typeof Router.prototype;
export type RouterResponse = AxiosResponse;
export type RouterError = AxiosError;
export type RouterMethod = Method;
export type RouterRequestConfig = AxiosRequestConfig;
export type RouterPromise = AxiosPromise;
