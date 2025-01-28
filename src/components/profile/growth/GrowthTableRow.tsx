import React from 'react';
import { DailyGrowth } from '../../../types/growth';

interface GrowthTableRowProps {
  data: DailyGrowth;
}

export const GrowthTableRow: React.FC<GrowthTableRowProps> = ({ data }) => {
  return (
    <tr className="border-t border-white/5">
      <td className="py-4">{data.date}</td>
      <td className="py-4">{data.followers.total.toLocaleString()}</td>
      <td className="py-4">
        <span className={data.followers.change >= 0 ? 'text-emerald-500' : 'text-red-500'}>
          {data.followers.change >= 0 ? '+' : ''}{data.followers.change.toLocaleString()}
        </span>
      </td>
      <td className="py-4">{data.posts.total.toLocaleString()}</td>
      <td className="py-4">
        {data.posts.new.length > 0 && (
          <span className="text-emerald-500">
            +{data.posts.new.length}
          </span>
        )}
      </td>
    </tr>
  );
};