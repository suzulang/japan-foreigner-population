import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### foreign_population_stats

| name        | type                     | format    | required |
|-------------|--------------------------|-----------|----------|
| id          | integer                  | bigint    | true     |
| nationality | string                   | varchar   | true     |
| purpose     | string                   | varchar   | true     |
| month       | string                   | date      | true     |
| value       | integer                  | integer   | true     |
| created_at  | string                   | timestamp | true     |
| updated_at  | string                   | timestamp | true     |

Note: 
- 'id' is the Primary Key.
- 'created_at' and 'updated_at' have default values of the current timestamp in UTC.
*/

export const useForeignPopulationStat = (id) => useQuery({
    queryKey: ['foreign_population_stats', id],
    queryFn: () => fromSupabase(supabase.from('foreign_population_stats').select('*').eq('id', id).single()),
});

export const useForeignPopulationStats = () => useQuery({
    queryKey: ['foreign_population_stats'],
    queryFn: async () => {
        const data = await fromSupabase(supabase.from('foreign_population_stats').select('*'));
        console.log('Fetched data:', data); // 调试信息
        return data;
    },
});

export const useAddForeignPopulationStat = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newStat) => fromSupabase(supabase.from('foreign_population_stats').insert([newStat])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['foreign_population_stats'] });
        },
    });
};

export const useUpdateForeignPopulationStat = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('foreign_population_stats').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['foreign_population_stats'] });
        },
    });
};

export const useDeleteForeignPopulationStat = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('foreign_population_stats').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['foreign_population_stats'] });
        },
    });
};
