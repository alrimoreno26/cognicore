import {createAction, props} from '@ngrx/store';
import {ConnectionsLazyLoad} from '../../../../core/models/table.model';
import {BrandModels, BrandResponse} from '../../models/brand.models';
import {CreatedTO} from '../../../business/models';


export enum EntityActionTypes {
    NoopAction = '[Brand] NoopAction',
    BrandError = '[Brand] Brand Fail Request',
    OpenAddOrEdit = '[Brand] Open Add Or Edit Dialog Brand',
    LoadBrandList = '[Brand] Load Brand List',
    LoadBrandSuccess = '[Brand] Load Brand List Success',
    AddBrand = '[Brand] Add Brand',
    AddBrandFromOnboarding = '[Brand] Add Brand From Onboarding',
    SelectedBrand = '[Brand] Selected Brand',
    AddBrandSuccess = '[Brand] Add Brand Success',
    EditBrand = '[Brand] Edit Brand',
    EditBrandSuccess = '[Brand] Edit Brand Complete',
    LoadInitialDataBrand = '[Brand] Load all brand information by Bussiness',
    CreateBrandFromBusiness = '[Brand] Add Brand from business',
    CreateBrandFromBusinessSuccess = '[Brand] Add Brand from business Success',
    DeleteBrand = '[Brand] Delete Brand',
    DeleteBrandSuccess = '[Brand] Delete Brand Success',
}

export const noopAction = createAction(EntityActionTypes.NoopAction);
export const loadBrandList = createAction(EntityActionTypes.LoadBrandList, props<{
    lazy: ConnectionsLazyLoad
}>());
export const loadBrandSuccess = createAction(EntityActionTypes.LoadBrandSuccess, props<{ data: BrandResponse }>());
export const brandError = createAction(EntityActionTypes.BrandError, props<{ error: Error | any }>());
export const addBrand = createAction(EntityActionTypes.AddBrand, props<{ data: BrandModels }>());
export const addBrandFromOnboarding = createAction(EntityActionTypes.AddBrandFromOnboarding, props<{ data: BrandModels }>());
export const addBrandSuccess = createAction(EntityActionTypes.AddBrandSuccess, props<{ response: CreatedTO }>());
export const openAddOrEdit = createAction(EntityActionTypes.OpenAddOrEdit);
export const loadInitialDataBrand = createAction(EntityActionTypes.LoadInitialDataBrand, props<{ entity: string }>());
export const selectedBrand = createAction(EntityActionTypes.SelectedBrand, props<{ entity: BrandModels }>());
export const deleteBrand = createAction(EntityActionTypes.DeleteBrand, props<{ id: any, businessId: string }>());
export const deleteBrandSuccess = createAction(EntityActionTypes.DeleteBrandSuccess);
export const createBrandFromBusiness = createAction(EntityActionTypes.CreateBrandFromBusiness, props<{ brand: BrandModels, datasource: any }>());
export const createBrandFromBusinessSuccess = createAction(EntityActionTypes.CreateBrandFromBusinessSuccess, props<{ response: CreatedTO }>());
export const editBrand = createAction(EntityActionTypes.EditBrand, props<{ data: BrandModels, id: any }>());
export const editBrandSuccess = createAction(EntityActionTypes.EditBrandSuccess);

export const fromBrandActions = {
    noopAction,
    loadBrandList,
    loadBrandSuccess,
    brandError,
    addBrand,
    addBrandFromOnboarding,
    addBrandSuccess,
    openAddOrEdit,
    selectedBrand,
    loadInitialDataBrand,
    createBrandFromBusiness,
    createBrandFromBusinessSuccess,
    editBrand,
    editBrandSuccess,
    deleteBrand,
    deleteBrandSuccess
};
