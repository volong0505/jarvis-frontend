export const COLORS = [
    {
        label: 'blue',
      hex: '#3c9ae8'
    },
    {
      label: 'green',
      hex: '#6abe39'
    },
    {
        label: 'yellow',
        hex: '#e8d639'
    },
    {
        label: 'orange',
        hex: '#e89a3c'
    },
    {
        label: 'red',
        hex: '#e84749'
    },
    {
        label: 'purple',
        hex: '#854eca'
    }
  ]
  
export class ColorUtil {
    public static hexToColor(hex: string): string {
        return COLORS.find(e => e.hex == hex)?.label || 'blue';
    }

    public static colorToHex(color: string): string {
        return COLORS.find(e => e.label == color)?.hex || '#3c9ae8'
    }
}