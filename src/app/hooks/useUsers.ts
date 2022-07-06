import {useInfiniteQuery} from 'react-query'
import axios from 'axios'
import {IUsers} from '../../types'

const API_URL = 'http://localhost:1881'

axios.defaults.baseURL = API_URL

const fetchUsers = ({pageParam = 1}) => {
    return axios.get<IUsers[]>(`/users?_page=${pageParam}`)
}

export const useUsers = () => {
    const {isLoading, data:response, fetchNextPage, isFetchingNextPage} = useInfiniteQuery('user list', fetchUsers, {
        getNextPageParam: (_lastPage, pages) => {
            if (pages.length) {
                return pages.length + 1
            } else {
                return undefined
            }
        }
    })
    return {isLoading, data:response, fetchNextPage, isFetchingNextPage}
}