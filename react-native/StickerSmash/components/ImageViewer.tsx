import { Image, ImageSourcePropType, View } from "react-native";

export default function ImageViewer({
  placeholderImage,
  selectedImage,
}: {
  placeholderImage: ImageSourcePropType;
  selectedImage?: string;
}) {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImage;
  return (
    <View style={styles.imageContainer}>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
}

const styles = {
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
};
