import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useForeignPopulationStats } from '@/integrations/supabase';

const Index = () => {
  const { data: foreignPopulationStats, isLoading, error, refetch } = useForeignPopulationStats();
  const [nationality, setNationality] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [nationalities, setNationalities] = useState([]);

  useEffect(() => {
    if (foreignPopulationStats) {
      const uniqueNationalities = [...new Set(foreignPopulationStats.map(stat => stat.nationality))].filter(nat => nat !== '総数');
      setNationalities(uniqueNationalities);
      
      // デフォルトで総数のデータを表示
      const totalData = foreignPopulationStats.filter(stat => stat.nationality === '総数');
      const chartData = totalData.map(stat => ({
        month: stat.month,
        population: stat.value
      })).sort((a, b) => new Date(a.month) - new Date(b.month));
      setFilteredData(chartData);
    }
  }, [foreignPopulationStats]);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error.message}</div>;

  const handleStartSurvey = () => {
    let filtered = foreignPopulationStats;
    if (nationality) {
      filtered = filtered.filter(stat => stat.nationality === nationality);
    } else {
      filtered = filtered.filter(stat => stat.nationality === '総数');
    }

    console.log('フィルタリングされたデータ:', filtered);

    const chartData = filtered.map(stat => ({
      month: stat.month,
      population: stat.value
    })).sort((a, b) => new Date(a.month) - new Date(b.month));

    console.log('チャートデータ:', chartData);

    setFilteredData(chartData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">日本の外国人人口変動調査へようこそ</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              <span className="inline-block mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </span>
              調査情報
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">国籍選択</label>
                <Select onValueChange={setNationality}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="国籍を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {nationalities.map(nat => (
                      <SelectItem key={nat} value={nat}>{nat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={handleStartSurvey}>調査開始</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              <span className="inline-block mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </span>
              外国人人口変動傾向
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="population" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-gray-500">データがありません</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;