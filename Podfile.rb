platform :ios, '13.0'
use_frameworks!

# Añadir estas líneas ANTES de target 'App' do
pod 'Firebase/Analytics'

target 'App' do
  capacitor_pods
  # Add your Pods here
end
