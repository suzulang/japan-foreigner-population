import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

export const useForeignPopulationStat = (id) => useQuery({
    queryKey: ['foreign_population_stats', id],
    queryFn: () => fromSupabase(supabase.from('foreign_population_stats').select('*').eq('id', id).single()),
});

export const useForeignPopulationStats = () => useQuery({
    queryKey: ['foreign_population_stats'],
    queryFn: async () => {
        const data = await fromSupabase(supabase.from('foreign_population_stats').select('*'));
        console.log('取得したデータ:', data);
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