import React, { useState, useEffect } from 'react';
import { useForeignPopulationStats } from '@/integrations/supabase';
import SurveyInfoCard from '@/components/SurveyInfoCard';
import PopulationTrendCard from '@/components/PopulationTrendCard';

const Index = () => {
  const { data: foreignPopulationStats, isLoading, error, refetch } = useForeignPopulationStats();
  const [nationality, setNationality] = useState('総数');
  const [purpose, setPurpose] = useState('総数');
  const [filteredData, setFilteredData] = useState([]);
  const [nationalities, setNationalities] = useState([]);

  useEffect(() => {
    if (foreignPopulationStats) {
      const uniqueNationalities = [...new Set(foreignPopulationStats.map(stat => stat.nationality))];
      setNationalities(uniqueNationalities);
      
      // デフォルトで総数のデータを表示
      filterAndSetData('総数', '総数');
    }
  }, [foreignPopulationStats]);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error.message}</div>;

  const filterAndSetData = (selectedNationality, selectedPurpose) => {
    let filtered = foreignPopulationStats;
    if (selectedNationality) {
      filtered = filtered.filter(stat => stat.nationality === selectedNationality);
    }
    if (selectedPurpose) {
      filtered = filtered.filter(stat => stat.purpose === selectedPurpose);
    }

    const chartData = filtered.map(stat => ({
      month: stat.month,
      population: stat.value
    })).sort((a, b) => new Date(a.month) - new Date(b.month));

    setFilteredData(chartData);
  };

  const handleStartSurvey = () => {
    filterAndSetData(nationality, purpose);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">日本の外国人人口変動調査へようこそ</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SurveyInfoCard
          nationalities={nationalities}
          setNationality={setNationality}
          setPurpose={setPurpose}
          handleStartSurvey={handleStartSurvey}
        />
        <PopulationTrendCard filteredData={filteredData} />
      </div>
    </div>
  );
};

export default Index;