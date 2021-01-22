import { Router } from '../router';
import { AxiosError, AxiosResponse, Method } from 'axios';

export type RouterInstance = typeof Router.prototype;
export type RouterResponse = AxiosResponse;
export type RouterError = AxiosError;
export type RouterMethod = Method;
