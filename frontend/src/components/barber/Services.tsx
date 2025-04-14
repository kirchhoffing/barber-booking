import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getServices, createService, updateService, deleteService } from '../../services/barber';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description?: string;
}

export const Services: React.FC = () => {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    duration: 30,
    price: 0,
    description: ''
  });

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: getServices
  });

  const createMutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      setNewService({ name: '', duration: 30, price: 0, description: '' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateService,
    onSuccess: () => {
      setEditingService(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteService
  });

  const handleCreate = () => {
    createMutation.mutate(newService);
  };

  const handleUpdate = () => {
    if (editingService) {
      updateMutation.mutate(editingService);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bu hizmeti silmek istediğinize emin misiniz?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Yükleniyor...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Hizmetler</h2>
      
      {/* Yeni Hizmet Ekleme Formu */}
      <div className="mb-6 p-4 bg-gray-800 rounded">
        <h3 className="text-lg font-semibold mb-3">Yeni Hizmet Ekle</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Hizmet Adı"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            className="bg-gray-700 p-2 rounded"
          />
          <input
            type="number"
            placeholder="Süre (dakika)"
            value={newService.duration}
            onChange={(e) => setNewService({ ...newService, duration: parseInt(e.target.value) })}
            className="bg-gray-700 p-2 rounded"
          />
          <input
            type="number"
            placeholder="Fiyat"
            value={newService.price}
            onChange={(e) => setNewService({ ...newService, price: parseInt(e.target.value) })}
            className="bg-gray-700 p-2 rounded"
          />
          <textarea
            placeholder="Açıklama"
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            className="bg-gray-700 p-2 rounded"
          />
        </div>
        <button
          onClick={handleCreate}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Hizmet Ekle
        </button>
      </div>

      {/* Mevcut Hizmetler Listesi */}
      <div className="space-y-4">
        {services?.map((service: Service) => (
          <div key={service.id} className="p-4 bg-gray-800 rounded flex justify-between items-center">
            {editingService?.id === service.id ? (
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="bg-gray-700 p-2 rounded"
                />
                <input
                  type="number"
                  value={editingService.duration}
                  onChange={(e) => setEditingService({ ...editingService, duration: parseInt(e.target.value) })}
                  className="bg-gray-700 p-2 rounded"
                />
                <input
                  type="number"
                  value={editingService.price}
                  onChange={(e) => setEditingService({ ...editingService, price: parseInt(e.target.value) })}
                  className="bg-gray-700 p-2 rounded"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleUpdate}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Kaydet
                  </button>
                  <button
                    onClick={() => setEditingService(null)}
                    className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    İptal
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h4 className="font-semibold">{service.name}</h4>
                  <p className="text-sm text-gray-400">{service.duration} dk - {service.price} TL</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingService(service)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Sil
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 