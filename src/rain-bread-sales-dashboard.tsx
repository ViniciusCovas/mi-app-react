import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const RainBreadSalesDashboard = () => {
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [rainAmount, setRainAmount] = useState(0);

  const calculateSales = (day, rain) => {
    const baseSales = {
      'Lunes': 100,
      'Martes': 90,
      'Miércoles': 95,
      'Jueves': 85,
      'Viernes': 110,
      'Sábado': 130,
      'Domingo': 120
    };
    
    const rainMultiplier = 1 + (rain / 100);
    return Math.round(baseSales[day] * rainMultiplier);
  };

  const generateChartData = () => {
    return daysOfWeek.map(day => ({
      day,
      ventas: calculateSales(day, day === selectedDay ? rainAmount : 0)
    }));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Dashboard de Ventas de Pan y Lluvia</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="block mb-2">Seleccionar día:</label>
          <Select onValueChange={setSelectedDay} value={selectedDay}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un día" />
            </SelectTrigger>
            <SelectContent>
              {daysOfWeek.map(day => (
                <SelectItem key={day} value={day}>{day}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Cantidad de lluvia (mm):</label>
          <Slider
            min={0}
            max={100}
            step={1}
            value={[rainAmount]}
            onValueChange={(value) => setRainAmount(value[0])}
          />
          <p className="mt-2">Lluvia: {rainAmount} mm</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={generateChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ventas" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4">
          Ventas de pan para {selectedDay}: {calculateSales(selectedDay, rainAmount)} unidades
        </p>
      </CardContent>
    </Card>
  );
};

export default RainBreadSalesDashboard;
