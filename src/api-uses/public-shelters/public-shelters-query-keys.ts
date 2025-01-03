import { API_ROUTES } from "@/utils/constants";


export const publicSheltersQueryKeys = {
  all: [API_ROUTES.PUBLIC_SHELTERS],
  details: () => [...publicSheltersQueryKeys.all, 'detail'],
  detail: (id: string) => [...publicSheltersQueryKeys.details(), id],
}
