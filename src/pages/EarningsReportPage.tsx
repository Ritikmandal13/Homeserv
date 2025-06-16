import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const EarningsReportPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEarnings = async () => {
      if (!user) return;
      setLoading(true);
      const { data: bookings, error } = await (supabase as any)
        .rpc('get_provider_bookings', { provider_user_id: user.id });
      if (!error && bookings) {
        const completed = bookings.filter((b: any) => b.status === 'completed');
        setCompletedJobs(completed);
        setTotalEarnings(completed.reduce((sum: number, b: any) => sum + Number(b.total_amount), 0));
      }
      setLoading(false);
    };
    fetchEarnings();
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200">
      <Card className="w-full max-w-2xl shadow-2xl rounded-3xl border-0 p-8 flex flex-col items-center">
        <div className="w-full flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft className="w-6 h-6 text-orange-600" />
          </Button>
        </div>
        <CardHeader className="flex flex-col items-center">
          <BarChart2 className="w-12 h-12 text-orange-600 mb-4" />
          <CardTitle className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Earning Report</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col gap-8 items-center">
          {loading ? (
            <div className="text-lg text-gray-700">Loading earnings...</div>
          ) : (
            <>
              <div className="w-full flex flex-col md:flex-row md:justify-between gap-4 mb-6">
                <div>
                  <div className="text-gray-500 text-sm">Total Earnings</div>
                  <div className="text-2xl font-bold text-green-700">₹{totalEarnings.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Completed Jobs</div>
                  <div className="text-2xl font-bold">{completedJobs.length}</div>
                </div>
              </div>
              <div className="w-full">
                <div className="font-semibold text-lg mb-2">Recent Completed Bookings</div>
                {completedJobs.length === 0 ? (
                  <div className="text-gray-500">No completed bookings yet.</div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 pr-4">Date</th>
                        <th className="py-2 pr-4">Service</th>
                        <th className="py-2 pr-4">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedJobs.slice(0, 5).map((job: any) => (
                        <tr key={job.id} className="border-b last:border-0">
                          <td className="py-2 pr-4">{new Date(job.scheduled_date).toLocaleDateString('en-IN')}</td>
                          <td className="py-2 pr-4">{job.service_name}</td>
                          <td className="py-2 pr-4">₹{Number(job.total_amount).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsReportPage; 