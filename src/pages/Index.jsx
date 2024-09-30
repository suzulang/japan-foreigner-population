import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useForeignPopulationStats } from '@/integrations/supabase';

const Index = () => {
  const { data: foreignPopulationStats, isLoading, error } = useForeignPopulationStats();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 处理数据以适应图表格式
  const chartData = foreignPopulationStats?.reduce((acc, curr) => {
    const year = new Date(curr.month).getFullYear();
    const existingYear = acc.find(item => item.year === year);
    if (existingYear) {
      existingYear.population += curr.value;
    } else {
      acc.push({ year, population: curr.value });
    }
    return acc;
  }, []).sort((a, b) => a.year - b.year);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">欢迎来到日本外国人口变化调查</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              <span className="inline-block mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </span>
              调查信息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">国籍选择</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="选择国籍" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="china">中国</SelectItem>
                    <SelectItem value="usa">美国</SelectItem>
                    <SelectItem value="uk">英国</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">居住地区</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="选择居住地区" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tokyo">东京</SelectItem>
                    <SelectItem value="osaka">大阪</SelectItem>
                    <SelectItem value="kyoto">京都</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">开始调查</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              <span className="inline-block mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </span>
              外国人口变化趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={['auto', 'auto']} tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip formatter={(value) => [`${value / 1000000}M`, '外国人口']} />
                <Line type="monotone" dataKey="population" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;