'use client'
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { appliances, categories } from '@/lib/appliances';
import { FaPlus, FaTrash, FaSearch, FaMicrophone, FaStop } from 'react-icons/fa';

interface SelectedItem {
  id: string;
  nameEn: string;
  nameUr: string;
  wattage: number;
  icon: string;
  hours: number;
  quantity: number;
}

interface ApplianceSelectorProps {
  onCalculate: (selected: SelectedItem[]) => void;
}

export default function ApplianceSelector({ onCalculate }: ApplianceSelectorProps) {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  
  // Form states
  const [selectedAppliance, setSelectedAppliance] = useState('');
  const [hours, setHours] = useState('');
  const [quantity, setQuantity] = useState('1');
  
  // Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<typeof appliances>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Voice states
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [voiceSupported, setVoiceSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Check voice support
  useEffect(() => {
    const supported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setVoiceSupported(supported);
  }, []);

  // Voice Recognition
  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
    }

    if (!voiceSupported) {
      alert(t('Voice not supported in this browser', 'آواز سپورٹ نہیں ہے'));
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        console.log('Voice started');
        setIsListening(true);
        setVoiceText('');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log('Voice result:', transcript);
        setVoiceText(transcript);
        processVoiceCommand(transcript.toLowerCase());
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Voice error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        console.log('Voice ended');
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
      
    } catch (error) {
      console.error('Speech error:', error);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
      setIsListening(false);
    }
  };

  const processVoiceCommand = (text: string) => {
    console.log('Voice command:', text);
    
    // Find matching appliance
    const foundAppliance = appliances.find(app => 
      app.nameEn.toLowerCase().includes(text) || 
      (app.nameUr && app.nameUr.includes(text))
    );

    if (foundAppliance) {
      console.log('Found appliance:', foundAppliance.nameEn);
      
      // Select the appliance
      setSelectedAppliance(foundAppliance.id);
      
      // Extract numbers from text
      const numbers = text.match(/\d+/g);
      console.log('Numbers found:', numbers);
      
      let hoursNum = 0;
      let quantityNum = 1;
      
      if (numbers && numbers.length > 0) {
        // First number is quantity
        quantityNum = parseInt(numbers[0]);
        
        // Second number is hours
        if (numbers.length >= 2) {
          hoursNum = parseInt(numbers[1]);
        }
      }
      
      setQuantity(quantityNum.toString());
      setHours(hoursNum.toString());
      
      // خودکار add کر دو
      setTimeout(() => {
        if (hoursNum > 0 && hoursNum <= 24) {
          const newItem = {
            id: `${foundAppliance.id}-${Date.now()}`,
            nameEn: foundAppliance.nameEn,
            nameUr: foundAppliance.nameUr,
            wattage: foundAppliance.wattage,
            icon: foundAppliance.icon,
            hours: hoursNum,
            quantity: quantityNum
          };
          
          setSelectedItems(prev => [...prev, newItem]);
          
          // Reset form
          setSelectedAppliance('');
          setHours('');
          setQuantity('1');
          setVoiceText('');
          
          console.log('Auto-added:', newItem);
        }
      }, 500);
    }
  };

  // Search functionality
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = appliances
        .filter(a => selectedCategory === 'all' || a.category === selectedCategory)
        .filter(a => 
          (language === 'en' ? a.nameEn.toLowerCase() : a.nameUr.toLowerCase())
            .includes(searchTerm.toLowerCase())
        );
      setSearchResults(filtered);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchTerm, selectedCategory, language]);

  // Close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectApplianceFromSearch = (appId: string) => {
    setSelectedAppliance(appId);
    setSearchTerm('');
    setShowDropdown(false);
  };

  const handleAddAppliance = () => {
    if (!selectedAppliance) return;
    if (!hours) return;

    const appliance = appliances.find(a => a.id === selectedAppliance);
    if (!appliance) return;

    const hoursNum = parseFloat(hours);
    if (isNaN(hoursNum) || hoursNum <= 0 || hoursNum > 24) return;

    const quantityNum = parseInt(quantity);
    if (isNaN(quantityNum) || quantityNum <= 0) return;

    const newItem = {
      id: `${appliance.id}-${Date.now()}`,
      nameEn: appliance.nameEn,
      nameUr: appliance.nameUr,
      wattage: appliance.wattage,
      icon: appliance.icon,
      hours: hoursNum,
      quantity: quantityNum
    };

    setSelectedItems([...selectedItems, newItem]);
    
    // Reset form
    setSelectedAppliance('');
    setHours('');
    setQuantity('1');
    setVoiceText('');
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleCalculate = () => {
    if (selectedItems.length === 0) return;
    onCalculate(selectedItems);
  };

  const filteredAppliances = selectedCategory === 'all'
    ? appliances
    : appliances.filter(a => a.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Voice Input Bar */}
      {voiceSupported && (
        <div className="relative">
          <div className="flex gap-2">
            <input
              type="text"
              value={voiceText}
              onChange={(e) => setVoiceText(e.target.value)}
              placeholder={isListening ? 'Listening...' : 'Click mic and speak'}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              readOnly
            />
            <button
              onClick={isListening ? stopListening : startListening}
              className={`px-4 py-3 rounded-lg font-medium flex items-center gap-2 transition-all ${
                isListening 
                  ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isListening ? <FaStop /> : <FaMicrophone />}
            </button>
          </div>
          {isListening && (
            <div className="absolute -bottom-6 left-0 text-sm text-green-400 animate-pulse">
              🎤 Listening...
            </div>
          )}
        </div>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          {t('All', 'تمام')}
        </button>
        {categories.filter(c => c.id !== 'all').map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {cat.nameEn}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative" ref={searchRef}>
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search appliances..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        
        <AnimatePresence>
          {showDropdown && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-xl max-h-60 overflow-y-auto"
            >
              {searchResults.map((app) => (
                <button
                  key={app.id}
                  onClick={() => selectApplianceFromSearch(app.id)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors flex items-center gap-3"
                >
                  <span className="text-xl">{app.icon}</span>
                  <div>
                    <p className="text-white font-medium">{app.nameEn}</p>
                    <p className="text-xs text-gray-400">{app.wattage}W</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={selectedAppliance}
          onChange={(e) => setSelectedAppliance(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
        >
          <option value="">Select Appliance</option>
          {filteredAppliances.map((app) => (
            <option key={app.id} value={app.id}>
              {app.icon} {app.nameEn} ({app.wattage}W)
            </option>
          ))}
        </select>

        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Hours per day"
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
          min="1"
          max="24"
          step="0.5"
        />
      </div>

      {/* Quantity and Add */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
          min="1"
          step="1"
        />

        <button
          onClick={handleAddAppliance}
          disabled={!selectedAppliance || !hours}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg px-4 py-3 text-white font-medium flex items-center justify-center gap-2 transition-all"
        >
          <FaPlus /> Add Appliance
        </button>
      </div>

      {/* Selected Appliances List */}
      {selectedItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3 mt-6"
        >
          <h3 className="text-lg font-semibold text-white">
            Selected Appliances ({selectedItems.length})
          </h3>
          
          {selectedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800/50 p-4 rounded-lg flex items-center justify-between group hover:bg-gray-800 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-white font-medium">{item.nameEn}</p>
                  <p className="text-sm text-gray-400">
                    {item.wattage}W × {item.quantity} × {item.hours}h/day
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(index)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <FaTrash />
              </button>
            </motion.div>
          ))}

          <button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg py-4 text-white font-medium text-lg mt-4 transition-all hover:scale-105"
          >
            Calculate Bill →
          </button>
        </motion.div>
      )}
    </div>
  );
}