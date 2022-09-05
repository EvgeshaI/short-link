import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISqueezeLink} from "../types/TypesShortLink";
import {AppThunk} from "./index";
import {ShortLinkClient} from "../api/ShortLinkClient";

interface ContentState {
    squeezeLink: ISqueezeLink | null
    statistic: Array<ISqueezeLink>
    offset: number
    hasMore: boolean
}

const initialState: ContentState = {
    squeezeLink: null,
    statistic: [],
    offset: 0,
    hasMore: false
};
export const contentSlice = createSlice(
    {
        name: 'content',
        initialState,
        reducers: {
            setShortLink: (state, action: PayloadAction<ISqueezeLink>) => {
                    state.squeezeLink = action.payload
            },
            loadStatistic: (state, action: PayloadAction<Array<ISqueezeLink>>) => {
                let statistic = action.payload;
                if(statistic.length > 0) {
                    state.statistic = [...statistic]
                    state.offset = state.offset + 10
                    state.hasMore = true
                }else{
                    state.hasMore = false
                }
            },
            loadMoreStatistic: (state, action: PayloadAction<Array<ISqueezeLink>>) => {
                let statistic = action.payload;
                if(statistic.length > 0) {
                    state.statistic = [...state.statistic, ...statistic]
                    state.offset = state.offset + 10
                    state.hasMore = true
                }else{
                    state.hasMore = false
                }
            },
            resetStatistic: (state) => {
                state.statistic = []
                state.offset = 0
                state.hasMore = false;
            }
        }
    }
)

export const {
    setShortLink,
    loadStatistic,
    loadMoreStatistic,
    resetStatistic
} = contentSlice.actions

export const squeezeLinkAsync = (link: string): AppThunk => async (dispatch: any) => {
    let result = await ShortLinkClient.squeezeLink(link)
    dispatch(setShortLink(result))
}
export const loadStatisticLinkAsync = (order: Array<string>): AppThunk => async (dispatch: any, getState) => {
    dispatch(resetStatistic())
    let result = await ShortLinkClient.statistic(0, order)
    dispatch(loadStatistic(result))
}

export const loadMoreStatisticLinkAsync = (order: Array<string>): AppThunk => async (dispatch: any, getState) => {
    let offset = getState().contentReducer.offset
    let result = await ShortLinkClient.statistic(offset, order)
    dispatch(loadMoreStatistic(result))
}

export default contentSlice.reducer;