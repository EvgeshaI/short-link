import React, {useEffect, useState} from "react";
import s from "./content.module.css"
import {useAppDispatch, useAppSelector} from "../../store";
import {ReactComponent as Triangle} from "./../../icons/triangle.svg";
import {loadMoreStatisticLinkAsync, loadStatisticLinkAsync, squeezeLinkAsync,} from "../../store/contentSlice";

export const Content = () => {
    const {
        squeezeLink,
        statistic,
        hasMore
    } = useAppSelector((state) => state.contentReducer);
    const {
        isAuth
    } = useAppSelector((state) => state.authReducer);
    const dispatch  = useAppDispatch()
    const [link, setLink] = useState("")
    const [counterOrder, setCounterOrder] = useState<string | null>(null)
    const [targetOrder, setTargetOrder] = useState<string | null>(null)
    const [shortOrder, setShortOrder] = useState<string | null>(null)
    const [orderField, setOrderField] = useState<string | null>(null)
    const changeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value)
    }
    const updateLink = () => {
        dispatch(squeezeLinkAsync(link))
        dispatch(loadStatisticLinkAsync(getOrder()))
    }
    useEffect(() => {
        dispatch(loadStatisticLinkAsync(getOrder()))
    }, [orderField])
    const loadMoreStatistic = () => {
        dispatch(loadMoreStatisticLinkAsync(getOrder()))
    }
    const getOrder = () => {
        if (orderField) {
            return [orderField]
        }
        return []
    }
    const sortCounter = () => {
        let current = counterOrder
        if (current === null) {
            current = 'asc_counter'
        } else if (current === 'asc_counter') {
            current = 'desc_counter'
        } else if (current === 'desc_counter') {
            current = null
        }
        setCounterOrder(current)
        setTargetOrder(null)
        setShortOrder(null)
        setOrderField(current)
    }
    const sortTarget = () => {
        let target = targetOrder
        if (target === null) {
            target = 'asc_target'
        } else if (target === 'asc_target') {
            target = 'desc_target'
        } else if (target === 'desc_target') {
            target = null
        }
        setTargetOrder(target)
        setCounterOrder(null)
        setShortOrder(null)
        setOrderField(target)
    }
    const sortShort = () => {
        let short = shortOrder
        if (short === null) {
            short = 'asc_short'
        } else if (short === 'asc_short') {
            short = 'desc_short'
        } else if (short === 'desc_short') {
            short = null
        }
        setShortOrder(short)
        setCounterOrder(null)
        setTargetOrder(null)
        setOrderField(short)
    }
    const targetIcon = () => {
        if(!targetOrder) {
            return
        }else if (targetOrder === "asc_target"){
            return <div className={s.iconStyle}>
                <Triangle/>
            </div>
        }else if (targetOrder === "desc_target"){
            return <div className={s.iconStyle} style={{transform: "rotate(180deg)"}}>
                <Triangle/>
            </div>
        }
    }
    const shortIcon = () => {
        if(!shortOrder) {
            return
        }else if (shortOrder === "asc_short"){
            return <div className={s.iconStyle}>
                <Triangle/>
            </div>
        }else if (shortOrder === "desc_short"){
            return <div className={s.iconStyle} style={{transform: "rotate(180deg)"}}>
                <Triangle/>
            </div>
        }
    }
    const counterIcon = () => {
        if(!counterOrder) {
            return
        }else if (counterOrder === "asc_counter"){
            return <div className={s.iconStyle}>
                <Triangle/>
            </div>
        }else if (counterOrder === "desc_counter"){
            return <div className={s.iconStyle} style={{transform: "rotate(180deg)"}}>
                <Triangle/>
            </div>
        }
    }

    return (
        <>
            {isAuth ?
                <div className={s.contentContainer}>
                    <div className={s.inputContainer}>
                        <input
                            onChange={changeLink}
                            value={link}
                            placeholder={"ваша ссылка"}
                            className={s.inputLink}
                        />
                        <div
                            onClick={updateLink}
                            className={s.buttonLink}>
                            Сгенерировать
                        </div>
                    </div>
                    {squeezeLink &&
                        <div className={s.shortLink}>{squeezeLink.short}</div>
                    }
                    <table>
                        <tr>
                            <th>
                                <div>
                                    <div onClick={sortTarget} style={{cursor: "pointer"}}>Исходная ссылка</div>
                                    {targetIcon()}
                                </div>
                            </th>
                            <th>
                                <div>
                                    <div onClick={sortShort} style={{cursor: "pointer"}}>Короткая ссылка</div>
                                    {shortIcon()}
                                </div>
                            </th>
                            <th>
                                <div>
                                    <div onClick={sortCounter} style={{cursor: "pointer"}}>Количество переходов</div>
                                    {counterIcon()}
                                </div>

                            </th>
                        </tr>
                        {statistic &&
                            statistic.map(el =>
                                <tr key={el.id}>
                                    <td className={s.target}>
                                        <a href={el.target}>{el.target} </a>
                                    </td>
                                    <td className={s.short}>
                                        <a href={`http://79.143.31.216/s/${el.short}`}>{el.short}</a>
                                    </td>
                                    <td className={s.counter}>{el.counter}</td>
                                </tr>
                            )
                        }
                    </table>
                    {hasMore &&
                        <div
                            onClick={loadMoreStatistic}
                            className={s.hasMoreButton}>
                            Загрузить ещё
                        </div>
                    }
                </div>
                :
                <div className={s.text}>Авторизуйтесь, чтобы генерировать ссылки</div>
            }
        </>
    )
}