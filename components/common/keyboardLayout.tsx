import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  SafeAreaView,
} from 'react-native';

export const KeyboardSafeLayout = ({ children, scrollable = false }) => {
  const Content = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Content
            style={{ flex: 1 }}
            contentContainerStyle={scrollable ? { flexGrow: 1 } : undefined}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </Content>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
