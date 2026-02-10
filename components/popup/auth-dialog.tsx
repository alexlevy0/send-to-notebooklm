"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { signInWithEmail, verifyOtp } from "@/lib/supabase";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: () => void;
}

type AuthStep = "EMAIL" | "OTP" | "SUCCESS";

export function AuthDialog({ open, onOpenChange, onLoginSuccess }: AuthDialogProps) {
  const [step, setStep] = useState<AuthStep>("EMAIL");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore state on mount
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.get("authState", (result) => {
        if (result.authState) {
          if (result.authState.step) setStep(result.authState.step);
          if (result.authState.email) setEmail(result.authState.email);
        }
      });
    }
  }, []);

  // Save state on change
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      if (step === "OTP" && email) {
        chrome.storage.local.set({ authState: { step, email } });
      }
    }
  }, [step, email]);

  const clearAuthState = () => {
     if (typeof chrome !== "undefined" && chrome.storage) {
       chrome.storage.local.remove("authState");
     }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError(null);

    try {
      await signInWithEmail(email);
      setStep("OTP");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to send code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setLoading(true);
    setError(null);

    try {
      let token = otp.trim();
      let type: "email" | "magiclink" = "email";

      // Check if input is a URL (Magic Link)
      if (token.startsWith("http")) {
         try {
           const url = new URL(token);
           // Try to find 'token' parameter
           const linkToken = url.searchParams.get("token");
           // Also check for hash fragment parameters just in case
           const hashParams = new URLSearchParams(url.hash.substring(1));
           const hashToken = hashParams.get("token") || hashParams.get("access_token");

           if (linkToken) {
             token = linkToken;
             type = "magiclink";
           } else if (hashToken) {
              // If we have an access_token directly, we might need a different flow,
              // but standard Magic Links usually have 'token'
              token = hashToken;
              type = "magiclink";
           } else {
             throw new Error("Could not find token in link");
           }
         } catch (e) {
           throw new Error("Invalid link format. Please paste the full 'Log In' link.");
         }
      }

      await verifyOtp(email, token, type);
      
      // Clear persistence on success
      clearAuthState();
      
      setStep("SUCCESS");
      
      // Notify parent and close after delay
      setTimeout(() => {
        onLoginSuccess();
        onOpenChange(false);
        // Reset state after close
        setTimeout(() => {
          setStep("EMAIL");
          setEmail("");
          setOtp("");
        }, 300);
      }, 1500);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Invalid code or link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            {step === "SUCCESS" ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <Lock className="h-5 w-5 text-indigo-600" />
            )}
            {step === "EMAIL" && "Sign in or Restore Purchase"}
            {step === "OTP" && "Enter Verification Code"}
            {step === "SUCCESS" && "Successfully Signed In"}
          </DialogTitle>
          <DialogDescription>
             {step === "EMAIL" && "Enter your email. If you bought Pro, use the purchase email."}
             {step === "OTP" && `We sent a 6-digit code to ${email}.`}
             {step === "SUCCESS" && "Your account has been linked. Reloading..."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          {error && (
             <div className="mb-4 p-3 rounded-md bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
             </div>
          )}

          {step === "EMAIL" && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-9" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Send Login Code
              </Button>
            </form>
          )}

          {step === "OTP" && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
               <div className="space-y-2">
                <Input 
                  type="text" 
                  placeholder="123456 or paste login link" 
                  className="text-center text-lg hidden-placeholder" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  autoFocus
                />
                <div className="text-xs text-center text-muted-foreground space-y-1">
                   <p>Check your email (including spam).</p>
                   <p className="text-indigo-600 font-medium">
                     If you received a Magic Link, copy and paste it above!
                   </p>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Verify & Sign In
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full text-xs text-muted-foreground"
                onClick={() => setStep("EMAIL")}
              >
                Change Email
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
