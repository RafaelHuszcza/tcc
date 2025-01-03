import { API_ROUTES } from "@/utils/constants";


export const sheltersQueryKeys = {
  all: [API_ROUTES.SHELTERS],
  details: () => [...sheltersQueryKeys.all, 'detail'],
  detail: (id: string) => [...sheltersQueryKeys.details(), id],
}
