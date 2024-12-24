interface SkeletonBoxProps {
  height: number | string;
  width: number | string;
  className?: string;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({ height, width, className = '' }) => (
  <div className={`shinny rounded-md bg-gray-40 ${className} h-${height} w-${width}`} />
);

export default SkeletonBox;
