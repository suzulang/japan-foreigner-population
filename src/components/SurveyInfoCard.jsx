import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const SurveyInfoCard = ({ nationalities, setNationality, setPurpose, handleStartSurvey }) => {
  return (
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
            <Select onValueChange={setNationality} defaultValue="総数">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">目的選択</label>
            <Select onValueChange={setPurpose} defaultValue="総数">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="目的を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="総数">総数</SelectItem>
                <SelectItem value="就労">就労</SelectItem>
                <SelectItem value="留学">留学</SelectItem>
                <SelectItem value="家族滞在">家族滞在</SelectItem>
                <SelectItem value="その他">その他</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" onClick={handleStartSurvey}>調査開始</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SurveyInfoCard;